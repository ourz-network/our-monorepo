import React from "react";
import { NFTCard } from "@/modules/subgraphs/utils";
import NFTPreviewCard from "./Preview/NFTPreviewCard";

const SquareGrid = ({ posts }: { posts: NFTCard[] }) => (
  <div className="flex flex-col gap-4 place-items-center mx-auto w-full md:grid 4xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 max-w-auto">
    {posts.map((post) => (
      <div key={post.name}>
        <NFTPreviewCard post={post} />
      </div>
    ))}
  </div>
);

export default SquareGrid;
