import { gql } from "@apollo/client";

export const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      name
      skills {
        id
        name
        votes
      }
    }
  }
`;

export const GET_ONE_WILDER = gql`
  query wilder($id: Int) {
    wilders {
      id
      name
      skills {
        id
        name
        votes
      }
    }
  }
`;

export const CREATE_WILDER = gql`
  mutation CreateWilder($data: WilderInput!) {
    createWilder(data: $data) {
      id
    }
  }
`;

export const DELETE_WILDER = gql`
  mutation DeleteWilder($id: String!) {
    deleteWilder(id: $id)
  }
`;

export const UPDATE_WILDER = gql`
  mutation UpdateWilder($id: String!, $data: WilderInput!) {
    updateWilder(id: $id, data: $data) {
      id
    }
  }
`;
