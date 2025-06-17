import StreamView from "../../components/StreamView";

const CreatorPage = ({ params: { creatorId } }: { params: { creatorId: string } }) => {
  return (
    <StreamView creatorId={creatorId}/>
  );
};

export default CreatorPage;