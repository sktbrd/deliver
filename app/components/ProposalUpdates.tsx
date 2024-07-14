"use client";

import { Box, Card, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Proposal } from "../types";
import { createClient } from "../utils/supabase/client";

interface Update {
  id: number;
  author: string;
  comment_body: string;
  created_at: string; // updated column name
  likes: number;
  proposal_id: string; // updated type
}

interface ProposalUpdatesProps {
  proposal: Proposal;
}

function ProposalUpdates({ proposal }: ProposalUpdatesProps) {
  const [updates, setupdates] = useState<Update[]>([]);
  const supabase = createClient();
  const [author, setAuthor] = useState<string>("");
  const [comment_body, setComment_body] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [created_at, setCreated_at] = useState<string>(""); // updated state name
  const [likes, setLikes] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");
  const user_account = useAccount();
  const [userWallet, setUserWallet] = useState<string>("");

  const onStart = async () => {
    try {
      const { data: updates } = await supabase
        .from("updates")
        .select()
        .eq("proposal_id", proposal.proposalId);
      setupdates(updates as Update[]);
      setUserWallet(String(user_account.address));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onStart();
  }, [proposal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id_index = Math.floor(Math.random() * 1000000);
    try {
      const { data, error } = await supabase.from("updates").insert([
        {
          id: id_index,
          author: userWallet, // Replace with the current user's name or ID
          comment_body: newComment,
          created_at: new Date().toISOString(), // updated column name
          likes: 0,
          proposal_id: proposal.proposalId,
        },
      ]);
      if (error) throw error;
      setNewComment("");
      onStart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box w={"full"} id="teste">
      {userWallet && (
        <h4 className=" font-semibold mb-2"> Connected User: {userWallet}</h4>
      )}
      {proposal.proposer === userWallet.toLowerCase() ? (
        <>
          <textarea
            className="w-full h-24 p-2 rounded-md border border-gray-200"
            placeholder="Add your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      ) : (
        <Text>Only the proposer can comment</Text>
      )}

      <VStack mt={4}>
        {updates && updates.length > 0
          ? updates.map((update) => (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                key={update.id}
                w={"full"}
                p={4}
              >
                <VStack align={"left"} gap={0} w={"full"}>
                  <Text fontSize={18}>{update.author}</Text>
                  <Text fontSize={14}>{update.comment_body}</Text>
                </VStack>
                {update.created_at}
              </Card>
            ))
          : ""}
      </VStack>
    </Box>
  );
}

export default ProposalUpdates;
