import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
    }
  }
`;

export const CREATE_SKILL = gql`
  mutation CreateSkill($data: SkillInput!) {
    createSkill(data: $data) {
      id
      name
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: String!) {
    deleteSkill(id: $id)
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: String!, $data: SkillInput!) {
    updateSkill(id: $id, data: $data) {
      id
      name
    }
  }
`;
