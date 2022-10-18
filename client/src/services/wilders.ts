import { GenericAbortSignal } from "axios";
import { IWilder, IWilderInput } from "../types/IWilder";
import API from "./APIClient";
import { gql } from "@apollo/client";

export async function getAllWilders({
  signal,
}: {
  signal?: GenericAbortSignal;
}): Promise<IWilder[]> {
  const { data } = await API.get("/wilders", { signal });
  return data;
}

export async function getOneWilder(id: number): Promise<IWilder> {
  const { data } = await API.get(`/wilders/${id}`);
  return data;
}

export async function createWilder(wilderProps: IWilderInput) {
  return API.post("/wilders", wilderProps);
}

export async function deleteWilder(id: number) {
  return API.delete(`/wilders/${id}`);
}

export async function updateWilder(
  id: number,
  wilderProps: Partial<IWilderInput>
) {
  return API.patch(`/wilders/${id}`, wilderProps);
}

export async function addSkillToWilder(wilderId: number, skillId: number) {
  return API.post(`/wilders/${wilderId}/skills`, { skillId });
}

export async function removeSkillFromWilder(wilderId: number, skillId: number) {
  return API.delete(`/wilders/${wilderId}/skills/${skillId}`);
}

export async function updateGrade(
  wilderId: number | string,
  skillId: number | string,
  votes: number
) {
  return API.patch(`/wilders/${wilderId}/skills/${skillId}`, { votes });
}

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
