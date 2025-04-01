type GitHubRepoStarsResponse = {
  stargazers_count: number
}

export async function getGithubStars() {
  const url = 'https://api.github.com/repos/lucasaugustsof/hynix'

  const response = await fetch(url)

  const { stargazers_count } =
    (await response.json()) as GitHubRepoStarsResponse

  return stargazers_count
}
