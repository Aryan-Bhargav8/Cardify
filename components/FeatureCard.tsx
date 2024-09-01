import React from "react";

interface Props {
  feature?: string;
  desc?: string;
}

const FeatureCard: React.FC<Props> = ({ feature, desc }) => {
  return (
    <div className="flex flex-col gap-y-2 bg-zinc-800 rounded-lg p-8">
      <h1 className="text-white font-semibold text-2xl">
        {feature || "Feature name"}
      </h1>
      <p className="text-zinc-400">
        {desc || "Desc name"}
      </p>
    </div>
  );
};

export default FeatureCard;