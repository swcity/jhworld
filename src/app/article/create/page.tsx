"use client";

import { useRouter } from "next/navigation";

type CreateProps = {
  id: number;
  title: string;
  context: string;
  // 여기에 필요한 다른 props가 있다면 추가하세요.
};
export default function Create(props: CreateProps) {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as HTMLFormElement).title.value;
    const context = (e.target as HTMLFormElement).context.value;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, context }),
    };
    fetch(process.env.NEXT_PUBLIC_API_URL + "articles", options)
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
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="context" placeholder="context"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
