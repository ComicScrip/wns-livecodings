import { gql } from "@apollo/client";

export const UPDATE_GRADE = gql`
  mutation UpdateGrade($wilderId: Int!, $skillId: Int!, $votes: Int!) {
    updateGrade(wilderId: $wilderId, skillId: $skillId, votes: $votes)
  }
`;
