export interface GraphData {
  red4ext: {
    latestRelease: {
      tagName: string;
      updatedAt: string;
      url: string;
    };
  };
  archivexl: {
    latestRelease: {
      tagName: string;
      updatedAt: string;
      url: string;
    };
  };
  tweakxl: {
    latestRelease: {
      tagName: string;
      updatedAt: string;
      url: string;
    };
  };
  codeware: {
    latestRelease: {
      tagName: string;
      updatedAt: string;
      url: string;
    };
  };
  cet: {
    latestRelease: {
      tagName: string;
      updatedAt: string;
      url: string;
    };
  };
  redscript: {
    latestRelease: {
      tagName: string;
      updatedAt: string;
      url: string;
    };
  };
}

export interface Repo {
  nameWithOwner: string;
  issues: {
    totalCount: number;
  };
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
}

export interface GithubData {
  nodes: [Repo];
}
