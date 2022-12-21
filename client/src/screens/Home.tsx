import clsx from "clsx";
import React from "react";
import Loader from "../components/Loader";
import Wilder from "../components/Wilder";
import WilderForm from "../components/WilderForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useWildersQuery } from "../gql/generated/schema";

export default function Home() {
  const [parent] = useAutoAnimate<any>();

  const { loading: loadingWilders, data } = useWildersQuery();
  const wilders = data?.wilders || [];

  return (
    <div>
      <WilderForm />
      <div
        data-testid="wilder-list"
        ref={parent}
        className={clsx(
          loadingWilders && "opacity-90 transition-opacity duration-500"
        )}
      >
        {loadingWilders && !wilders.length ? (
          <Loader />
        ) : (
          wilders
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((wilder) => <Wilder key={wilder.id} wilder={wilder} />)
        )}
      </div>
    </div>
  );
}
