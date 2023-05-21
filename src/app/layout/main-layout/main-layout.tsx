import Header from "@app/components/header";

interface MainLayoutProps {
  children: JSX.Element;
}

function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default MainLayout;
