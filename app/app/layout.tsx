import Navbar2 from "../components/Navbar/Navbar2";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar2 />
      {children}
    </section>
  );
}
