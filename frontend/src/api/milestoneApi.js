const BASE_URL = "http://localhost:4000/milestones";

export async function getMilestones() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      let message = `Failed to fetch milestones (${res.status})`;
      try {
        const body = await res.json();
        message = body.message || message;
      } catch {}
      const err = new Error(message);
      err.status = res.status;
      throw err;
    }

    return res.json();
  } catch (e) {
    const err = e instanceof Error ? e : new Error('Network error');
    if (!err.status) err.status = err.message === 'Failed to fetch' ? 0 : err.status;
    throw err;
  }
}

export async function createMilestone(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let payload = {};
    try {
      payload = await res.json();
    } catch {}
    const msg = payload.message || (res.status === 400 ? 'Validation failed' : 'Failed to save milestone');
    const err = new Error(msg);
    err.status = res.status;
    err.details = payload.errors || null;
    throw err;
  }

  return res.json();
}
