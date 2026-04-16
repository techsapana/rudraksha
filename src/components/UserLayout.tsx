import WhatsAppButton from "./WhatsAppButton";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <WhatsAppButton />
    </>
  );
};

export default UserLayout;
