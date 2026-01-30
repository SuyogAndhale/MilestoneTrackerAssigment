import { useEffect, useState } from "react";
import { getMilestones, createMilestone } from "../api/milestoneApi";

export function useMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMilestones() {
    try {
      setLoading(true);
      setError("");
      const data = await getMilestones();
      setMilestones(data);
    } catch (err) {
      if (err && err.status >= 500) {
        setError('Server error: could not load milestones. Please try again later.');
      } else if (err && err.status === 0) {
        setError('Network error: check your connection.');
      } else {
        setError(err.message || 'Unable to load milestones.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function addMilestone(payload) {
    try {
      setLoading(true);
      setError("");
      const result = await createMilestone(payload);
      await loadMilestones(); // sync with backend
      return result;
    } catch (err) {
      if (err && err.status >= 500) {
        setError('Server error: could not save milestone. Please try again later.');
      } else if (err && err.status === 0) {
        setError('Network error: check your connection.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMilestones();
  }, []);

  return {
    milestones,
    loading,
    error,
    addMilestone,
    reload: loadMilestones,
  };
}
