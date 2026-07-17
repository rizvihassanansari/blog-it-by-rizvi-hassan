import React, { useState } from "react";

import { DownArrowCircle, UpArrowCircle } from "@bigbinary/neeto-icons";
import { Tag, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "routes";

import {
  useCreateVote,
  useDestroyVote,
} from "../../../hooks/reactQueries/useVotesApi";
import { formatDate } from "../../utils";
import CategoryTags from "../commons/Tags";

const Item = ({
  id,
  title,
  updatedAt,
  slug,
  user: { name = "" } = {},
  categories,
  upvotes,
  downvotes,
  vote,
  isBloggable,
}) => {
  const [voteCount, setVoteCount] = useState(upvotes - downvotes);
  const [voteType, setVoteType] = useState(vote?.voteType || null);

  const voteId = vote?.id || null;

  const { t } = useTranslation();

  const { mutate: addVote } = useCreateVote();
  const { mutate: removeVote } = useDestroyVote();

  const handleUpvote = async () => {
    if (voteType === "upvote") {
      await removeVote(voteId);
      setVoteCount(previous => previous - 1);
      setVoteType(null);
    } else if (voteType === null) {
      await addVote({ postId: id, voteType: "upvote" });
      setVoteCount(previous => previous + 1);
      setVoteType("upvote");
    }
  };

  const handleDownvote = async () => {
    if (voteType === "downvote") {
      await removeVote(voteId);
      setVoteCount(previous => previous + 1);
      setVoteType(null);
    } else if (voteType === null) {
      await addVote({ postId: id, voteType: "downvote" });
      setVoteCount(previous => previous - 1);
      setVoteType("downvote");
    }
  };

  return (
    <li className="flex h-full items-center justify-between border-b border-gray-300 pb-4 pt-6">
      <div className="w-full">
        <div className="flex items-center gap-4">
          <Link to={`${routes.posts.show.replace(":slug", slug)}`}>
            <Typography
              className="mb-2 hover:text-blue-700"
              style="h2"
              weight="bold"
            >
              {title}
            </Typography>
          </Link>
          {isBloggable && <Tag label={t("labels.blogIt")} />}
        </div>
        <CategoryTags {...{ categories }} />
        <Typography style="body3" weight="bold">
          {name}
        </Typography>
        <Typography style="nano">{formatDate(updatedAt)}</Typography>
      </div>
      <div className="flex h-full w-10 flex-col items-center gap-1 ">
        <UpArrowCircle
          className={classNames(
            "cursor-pointer rounded-full transition-colors duration-300 hover:bg-green-500 hover:text-white",
            {
              "text-green-500": voteType === "upvote",
              "text-gray-500": voteType !== "upvote",
            }
          )}
          onClick={handleUpvote}
        />
        <Typography style="body2" weight="bold">
          {voteCount}
        </Typography>
        <DownArrowCircle
          className={classNames(
            "cursor-pointer rounded-full text-gray-500 transition-colors duration-300 hover:bg-red-500 hover:text-white",
            {
              "text-red-500": voteType === "downvote",
              "text-gray-500": voteType !== "downvote",
            }
          )}
          onClick={handleDownvote}
        />
      </div>
    </li>
  );
};

export default Item;
