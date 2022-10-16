import clsx from "clsx";
import React from "react";
import Loader from "../components/Loader";
import Wilder from "../components/Wilder";
import WilderForm from "../components/WilderForm";
import { IWilder } from "../types/IWilder";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@apollo/client";
import { GET_WILDERS } from "../services/wilders";

export default function Home() {
  const [parent] = useAutoAnimate<any>();

  const { loading, data, refetch } = useQuery(GET_WILDERS);
  const wilders: IWilder[] = data?.wilders || [];

  console.log({ wilders });

  return (
    <div>
      <WilderForm loadWildersIntoState={refetch} />
      <div
        ref={parent}
        className={clsx(
          loading && "opacity-90 transition-opacity duration-500"
        )}
      >
        {loading && !wilders.length ? (
          <Loader />
        ) : (
          wilders
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((wilder) => (
              <Wilder key={wilder.id} setWilders={() => {}} wilder={wilder} />
            ))
        )}
      </div>
    </div>
  );
}
