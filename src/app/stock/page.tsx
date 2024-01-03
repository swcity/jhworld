import Matong from "./Matong";
import Total from "./total/Total";

export default function stock(props: any) {
  return (
    <>
      <div>this is stock page</div>
      <ul>
        <Total />
        <Matong />
      </ul>
    </>
  );
}
