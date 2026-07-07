export type RepoCard = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  primaryLanguage: string | null;
  languages: { name: string; color: string | null; size: number }[];
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string | null;
  lastCommitDate: string | null;
  isPinned: boolean;
};

export type ReposPayload = {
  repos: RepoCard[];
  syncedAt: string; // ISO timestamp of when this fetch ran
};

export const DEFAULT_GITHUB_USERNAME = "Vaishnavi-Dubey";

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 60;

const PINNED_QUERY = /* GraphQL */ `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            updatedAt
            repositoryTopics(first: 12) {
              nodes { topic { name } }
            }
            primaryLanguage { name }
            languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node { name color }
              }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 1) { nodes { committedDate } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GqlRepo = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  primaryLanguage: { name: string } | null;
  languages: {
    edges: { size: number; node: { name: string; color: string | null } }[];
  };
  defaultBranchRef: {
    target: { history: { nodes: { committedDate: string }[] } };
  } | null;
};

type GqlResponse = {
  data?: { user: { pinnedItems: { nodes: GqlRepo[] } } | null };
  errors?: { message: string }[];
};

function mapGqlRepo(r: GqlRepo, isPinned: boolean): RepoCard {
  return {
    id: r.id,
    name: r.name,
    description: r.description,
    url: r.url,
    homepage: r.homepageUrl && r.homepageUrl.length > 0 ? r.homepageUrl : null,
    primaryLanguage: r.primaryLanguage?.name ?? null,
    languages: r.languages.edges.map((e) => ({
      name: e.node.name,
      color: e.node.color,
      size: e.size,
    })),
    topics: r.repositoryTopics?.nodes?.map((n) => n.topic.name) ?? [],
    stars: r.stargazerCount,
    forks: r.forkCount,
    updatedAt: r.updatedAt ?? null,
    lastCommitDate:
      r.defaultBranchRef?.target?.history?.nodes?.[0]?.committedDate ?? null,
    isPinned,
  };
}

async function fetchPinnedViaGraphQL(
  username: string,
  token: string
): Promise<RepoCard[] | null> {
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PINNED_QUERY,
        variables: { login: username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`GitHub GraphQL ${res.status}: ${res.statusText}`);
      return null;
    }

    const json = (await res.json()) as GqlResponse;
    if (json.errors?.length) {
      console.error("GraphQL errors:", json.errors);
      return null;
    }
    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
    return nodes.map((n) => mapGqlRepo(n, true));
  } catch (err) {
    console.error("GraphQL fetch failed:", err);
    return null;
  }
}

type RestRepo = {
  id: number;
  node_id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  topics?: string[];
  languages_url: string;
};

async function fetchLanguages(
  url: string,
  token?: string
): Promise<{ name: string; color: string | null; size: number }[]> {
  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Record<string, number>;
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, size]) => ({ name, color: null, size }));
  } catch {
    return [];
  }
}

async function fetchLastCommitDate(
  username: string,
  repo: string,
  token?: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      commit?: { committer?: { date?: string }; author?: { date?: string } };
    }[];
    return (
      data[0]?.commit?.committer?.date ??
      data[0]?.commit?.author?.date ??
      null
    );
  } catch {
    return null;
  }
}

async function fetchTopReposViaREST(
  username: string,
  token?: string
): Promise<RepoCard[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!res.ok) {
      console.error(`GitHub REST ${res.status}: ${res.statusText}`);
      return [];
    }
    const data = (await res.json()) as RestRepo[];
    const top = data
      .filter((r) => !r.fork && !r.archived)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );

    return Promise.all(
      top.map(async (r) => {
        const [languages, lastCommitDate] = await Promise.all([
          fetchLanguages(r.languages_url, token),
          fetchLastCommitDate(username, r.name, token),
        ]);
        return {
          id: r.node_id,
          name: r.name,
          description: r.description,
          url: r.html_url,
          homepage: r.homepage && r.homepage.length > 0 ? r.homepage : null,
          primaryLanguage: r.language,
          languages,
          topics: r.topics ?? [],
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
          lastCommitDate: lastCommitDate ?? r.pushed_at,
          isPinned: false,
        } satisfies RepoCard;
      })
    );
  } catch (err) {
    console.error("REST fetch failed:", err);
    return [];
  }
}

export async function fetchPortfolioRepos(
  username: string = DEFAULT_GITHUB_USERNAME
): Promise<ReposPayload> {
  const token = process.env.GITHUB_TOKEN;
  const syncedAt = new Date().toISOString();

  let pinned: RepoCard[] = [];
  if (token) {
    const fromGql = await fetchPinnedViaGraphQL(username, token);
    if (fromGql) pinned = fromGql;
  }

  const all = await fetchTopReposViaREST(username, token);

  // De-dupe: pinned first (preserve order), then remaining REST repos sorted by stars desc
  const pinnedNames = new Set(pinned.map((r) => r.name.toLowerCase()));
  const rest = all
    .filter((r) => !pinnedNames.has(r.name.toLowerCase()))
    .sort((a, b) => b.stars - a.stars || (
      new Date(b.lastCommitDate ?? 0).getTime() -
      new Date(a.lastCommitDate ?? 0).getTime()
    ));

  return { repos: [...pinned, ...rest], syncedAt };
}

// Convenience for components that want to import { revalidate } from one place.
export const revalidate = REVALIDATE_SECONDS;
