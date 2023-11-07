import Layout from "@/components/Layout";
import { productsSuccess } from "@/redux/main/mainActions";
import { wrapper } from "@/redux/store";

function Home() {
	return <Layout>Home page</Layout>;
}
export default Home;
// Reinitialized existing Git repository

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => () => {
	dispatch(productsSuccess([]));

	return { props: {} };
});
