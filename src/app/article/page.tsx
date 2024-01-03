import Link from "next/link";

export default async function Articles(props: any) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "articles", {
    cache: "no-store",
  });
  const articles = await response.json();

  return (
    <>
      {articles.map((article: any) => {
        return (
          <li key={article.id}>
            <Link
              href={{
                pathname: `/article/${article.id}`,
                query: `title=${article.title}&context=${article.context}`,
              }}
            >
              {article.title}{" "}
            </Link>
          </li>
        );
      })}
    </>
  );
}
