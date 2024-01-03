export default function Article(props: any) {
  return (
    <>
      <div>this is article {props.params.id} page</div>
      <h3>title : {props.searchParams.title}</h3>
      <h4>context : {props.searchParams.context}</h4>
    </>
  );
}
