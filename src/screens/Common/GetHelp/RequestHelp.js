import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {loadSubjects} from "../../../Store/Actions/SubjectActions";
import {insertHelp} from "../../../Store/Actions/HelpActions";
import { MappedElement} from "../../../utils/helpers";
import { helpGigStatus} from "../../../utils/Constants";
import {getArrayOfSubjectsAsLabeValueKeys} from '../../../utils/helpers'
import CIContainer from "../../../components/CIContainer";
import Styles from "./styles";
import {MultipleSelectPicker} from 'react-native-multi-select-picker';
import { View } from "react-native";
const RequestHelp =({onRequest})=>{
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(loadSubjects());
	},[]);
	const stateProps = useSelector(({Subjects,GetHelp,User})=>{
		return {
			Subjects,
			GetHelp,User
		};
	});
	const {data} = stateProps.Subjects;
	const {loading} = stateProps.GetHelp;
	const [subject,setSubject] = useState(  "");
	const handleSubmit = (e)=>{
		if(subject===""){
			alert("Select a Subject first!");
			return;
		}
		dispatch(insertHelp({
			status: helpGigStatus.ACTIVE,
			subjectId: subject[0].value,
			grade:stateProps.User.data.grade,
			subjectName: data.find(it=>it.id === subject).name,
			dateTime: new Date().toUTCString(),
		},async ()=>{
			alert("Help Request Successful!");
			onRequest();
		}));
	};
	return (
		<CIContainer>
			<View>
				{loading || stateProps.Subjects.loading?
					<CenteredLoading />
					:
					<>
						<H1 text="Ask for help"/>
						<MultipleSelectPicker
							items={getArrayOfSubjectsAsLabeValueKeys(data)}
							style={Styles.checkboxContainer}
							onSelectionsChange={(ele) => {
								setSubject([ele[0]]);
							}}
							buttonStyle={Styles.checkboxSelected}
							selectedItems={subject}
						/>
						<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
							Find Help
							</Text>
						</TouchableOpacity>
					</>
				}
			</View>
		</CIContainer>
	);
};

export default RequestHelp;