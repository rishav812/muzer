import StreamView from "../../components/StreamView";

// Next.js expects the page function to be async and receive a context object with params and searchParams as Promise
const CreatorPage = async ({ params }: { params: Promise<{ creatorId: string }> }) => {
  const resolvedParams = await params;
  return <StreamView creatorId={resolvedParams?.creatorId ?? ""} />;
};

export default CreatorPage;