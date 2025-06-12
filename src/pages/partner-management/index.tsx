import ChsHead from "@/components/layouts/ChsHead";
import UserList from "@/components/partners/user-list";
import PrivateRoute from "@/routes/PrivetRoute";

const PartnerManagementPage = () => {
	return (
		<PrivateRoute>
			<ChsHead /> 
			<UserList />
		</PrivateRoute>
	);
};

export default PartnerManagementPage;
