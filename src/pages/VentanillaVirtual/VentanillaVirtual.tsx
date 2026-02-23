import VentanillaHeader from "./VentanillaHeader";
import SearchForm from "./SearchForm";
const VentanillaVirtual = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <VentanillaHeader />
        </div>

        <div className="mx-auto max-w-3xl">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default VentanillaVirtual;
