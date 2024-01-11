import InputTodo from "@components/components/InputTodo";
import ListTodo from "@components/components/ListTodo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <InputTodo />
      <ListTodo />
    </main>
  );
}
