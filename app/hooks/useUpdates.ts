import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

export interface Update {
  id: number;
  author: string;
  comment_body: string;
  created_at: string; // updated column name
  likes: number;
  proposal_id: string;
}

export const useAllUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const supabase = createClient();

  async function fetchAllUpdates() {
    try {
      const { data: updates } = await supabase
        .from("updates")
        .select()
        .order("created_at", { ascending: false });
      setUpdates(updates as Update[]);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchAllUpdates();
  }, []);

  return {
    updates,
    setUpdates,
    fetchAllUpdates,
  };
};

export const useUpdates = (proposalId: number) => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const supabase = createClient();

  async function fetchUpdates() {
    console.log(proposalId);
    try {
      const { data: updates } = await supabase
        .from("updates")
        .select()
        .eq("proposal_id", proposalId);
      setUpdates(updates as Update[]);
      console.log(updates);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchUpdates();
  }, []);

  return {
    updates,
    setUpdates,
    fetchUpdates,
  };
};

export default useUpdates;
