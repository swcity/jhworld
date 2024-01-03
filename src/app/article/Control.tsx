"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <ul>
      <li>
        <Link href="/article/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={`/article/update/${id}`}>Update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={() => {
                const options = { method: "DELETE" };
                fetch(
                  process.env.NEXT_PUBLIC_API_URL + "articles/" + id,
                  options
                )
                  .then((resp) => resp.json())
                  .then((result) => {
                    router.push("/article");
                    router.refresh();
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
