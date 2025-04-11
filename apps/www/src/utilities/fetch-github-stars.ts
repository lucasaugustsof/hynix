type GitHubRepoStarsResponse = {
  stargazers_count: number
}

export async function fetchGithubStars() {
  const url = 'https://api.github.com/repos/lucasaugustsof/hynix'

  const githubResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const { stargazers_count } =
    (await githubResponse.json()) as GitHubRepoStarsResponse

  return stargazers_count
}
