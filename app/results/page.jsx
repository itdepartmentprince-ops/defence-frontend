import Result from '@/components/result/Result'

export const metadata = {
  title: "Selection Results | Prince Defence Academy",
  description:
    "View defence exam selection results and achievements of Prince Defence Academy students.",
  alternates: {
    canonical: "/results",
  },
};

const page = () => {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Result/>
      </main>
  )
}

export default page