"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateProps {
  // 여기에 필요한 다른 props가 있다면 추가하세요.
}
export default function Update(props: UpdateProps) {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "articles/" + id)
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setTitle(result.title);
        setContext(result.context);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as HTMLFormElement).title.value;
    const context = (e.target as HTMLFormElement).context.value;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, context }),
    };
    fetch(process.env.NEXT_PUBLIC_API_URL + `articles/${id}`, options)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const lastid = result.id;
        router.push(`/article/${lastid}?title=${title}&context=${context}`);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="context"
          placeholder="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
