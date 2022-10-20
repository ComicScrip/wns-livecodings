import React, { useEffect, useState } from "react";
import blank_profile from "../assets/avatar.png";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import CreatableSelect from "react-select/creatable";
import client from "../gql/client";
import {
  SkillsDocument,
  useCreateSkillMutation,
  useSkillsQuery,
  useUpdateWilderMutation,
  WilderDocument,
  WilderInput,
  WilderQuery,
} from "../gql/generated/schema";

export default function EditWilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedWilder, setEditedWilder] = useState<WilderInput>();

  useEffect(() => {
    if (id)
      client
        .query<WilderQuery>({
          query: WilderDocument,
          variables: { wilderId: parseInt(id, 10) },
        })
        .then(({ data }) => data && setEditedWilder(data.wilder))
        .catch(console.error);
  }, [id]);

  const { data } = useSkillsQuery();
  const availableSkills = data?.skills || [];

  const [updateWilder] = useUpdateWilderMutation();

  const [createSkill] = useCreateSkillMutation({
    refetchQueries: [{ query: SkillsDocument }],
  });

  if (!editedWilder || !id) return <Loader />;

  const { skills, name, bio, avatarUrl, city } = editedWilder;

  const save = () =>
    updateWilder({
      variables: {
        updateWilderId: parseInt(id, 10),
        data: {
          skills: skills?.map((s) => ({ id: s.id })),
          name,
          bio,
          avatarUrl,
          city,
        },
      },
      onCompleted: () => {
        toast.success("Wilder saved");
        navigate(`/wilders/${id}`);
      },
      onError: (err) => {
        console.error(err);
        toast.error("error while saving wilder");
      },
      refetchQueries: [
        { query: WilderDocument, variables: { wilderId: parseInt(id, 10) } },
      ],
    });

  return (
    <div className="flex flex-col items-center p-4 pt-10 mb-48">
      <img
        src={editedWilder.avatarUrl || blank_profile}
        alt={editedWilder.name}
        className="h-[50vw] w-[50vw] max-w-[300px] max-h-[300px] rounded-full mr-4 border-white border-[5px] shadow-md mb-8"
      />
      <label htmlFor="avatarUrl" className="flex flex-col items-center w-full">
        <span className="p-2">Avatar URL</span>
        <input
          onChange={(e) =>
            setEditedWilder({ ...editedWilder, avatarUrl: e.target.value })
          }
          className="pt-2 text-lg w-full"
          name="avatarUrl"
          id="avatarUrl"
          value={editedWilder.avatarUrl || ""}
        />
      </label>
      <label htmlFor="name" className="flex flex-col items-center w-full">
        <span className="p-2">Name</span>
        <input
          onChange={(e) =>
            setEditedWilder({ ...editedWilder, name: e.target.value })
          }
          className="pt-2 text-lg w-full"
          name="name"
          id="name"
          value={editedWilder.name}
        />
      </label>
      <label htmlFor="city" className="flex flex-col items-center w-full">
        <span className="p-2">City</span>
        <input
          onChange={(e) =>
            setEditedWilder({ ...editedWilder, city: e.target.value })
          }
          className="pt-2 text-lg w-full"
          name="city"
          id="city"
          value={editedWilder.city || ""}
        />
      </label>
      <label htmlFor="bio" className="flex flex-col items-center w-full">
        <span className="p-2">Bio</span>
        <textarea
          onChange={(e) =>
            setEditedWilder({ ...editedWilder, bio: e.target.value })
          }
          className="pt-2 text-lg w-full"
          name="bio"
          value={editedWilder.bio || ""}
          id="bio"
        >
          {editedWilder.bio}
        </textarea>
      </label>
      <label htmlFor="skills" className="flex flex-col items-center">
        <span className="p-2">Skills</span>

        <CreatableSelect
          isMulti
          name="skills"
          id="skills"
          getOptionValue={(o: any) => o.value || (o.id.toString() as any)}
          getOptionLabel={(o: any) =>
            o.label || o.name + (o.votes && o.votes > 1 ? `(${o.votes})` : "")
          }
          options={availableSkills}
          className="w-full"
          classNamePrefix="select"
          value={editedWilder.skills}
          closeMenuOnSelect={false}
          onChange={(skills, meta) => {
            if (meta.action === "create-option") {
              createSkill({
                variables: { data: { name: (meta.option as any).value } },
              }).then(({ data }) => {
                if (data?.createSkill)
                  setEditedWilder({
                    ...editedWilder,
                    skills: skills.map((s: any) =>
                      s.__isNew__ ? data?.createSkill : s
                    ),
                  });
              });
            } else
              setEditedWilder({
                ...editedWilder,
                skills: skills.slice(),
              });
          }}
        />
      </label>
      <button className="mt-12 m-3" onClick={save}>
        Save
      </button>
    </div>
  );
}
