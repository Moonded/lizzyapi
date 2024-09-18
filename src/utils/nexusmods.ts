export async function NexusQueryByName(name: string) {
  const User = await fetch(process.env.NEXUSMODS_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
                query userByName($name: String!) {
                    userByName(name: $name) {
                        name
                        modCount
                        avatar
                        kudos
                        country
                        uniqueModDownloads
                        memberId
                        about
                        posts

                    }
                }`,
      variables: JSON.stringify({ name: name }),
    }),
  });

  const data = await User.json();

  return data;
}

export async function NexusModsByFilterUserId(userId: String) {
  const User = await fetch(process.env.NEXUSMODS_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
                  query mods($filter: ModsFilter!, $sort: [ModsSort!], $count: Int) {
                      mods(filter: $filter, sort: $sort, count: $count) {
                          nodes {
                            id
                            author
                            name
                            uid
                            version
                            uploader {
                                memberId
                                name
                            }
                            downloads
                            endorsements
                            modCategory {
                                categoryId
                                id
                                name
                            }
                          }
                      }
                  }`,
      variables: JSON.stringify({
        count: 5,
        filter: { uploaderId: { value: userId, op: "EQUALS" } },
        sort: [{ endorsements: { direction: "DESC" } }],
      }),
    }),
  });

  const data = await User.json();

  return data;
}

export async function NexusModsByFilterAuthor(userId: string) {
  const User = await fetch(process.env.NEXUSMODS_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
                    query mods($filter: ModsFilter!, $sort: [ModsSort!], $count: Int) {
                        mods(filter: $filter, sort: $sort, count: $count) {
                            nodes {
                              id
                              author
                              name
                              uid
                              version
                              uploader {
                                  memberId
                                  name
                              }
                              downloads
                              endorsements
                              modCategory {
                                  categoryId
                                  id
                                  name
                              }
                            }
                        }
                    }`,
      variables: JSON.stringify({
        count: 5,
        filter: { author: { value: userId, op: "EQUALS" } },
        sort: [{ endorsements: { direction: "DESC" } }],
      }),
    }),
  });

  const data = await User.json();

  return data;
}

export async function NexusModsQuery(username: string) {
  const User = await fetch(process.env.NEXUSMODS_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Query($filter: ModsFilter!, $sort: [ModsSort!], $count: Int, $name: String!) {
                mods(filter: $filter, sort: $sort, count: $count) {
                    nodes {
                        id
                        name
                        uid
                        version
                        downloads
                        endorsements
                        adultContent
                        summary
                        pictureUrl
                    }
                }
                userByName(name: $name) {
                    name
                    modCount
                    avatar
                    kudos
                    country
                    uniqueModDownloads
                    memberId
                    about
                    posts
                }
            }`,
      variables: JSON.stringify({
        count: 4,
        name: username,
        filter: { author: { value: username, op: "EQUALS" } },
        sort: [{ endorsements: { direction: "DESC" } }],
      }),
    }),
  });

  const data = await User.json();

  return data.data;
}
