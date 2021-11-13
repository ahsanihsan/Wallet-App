import React from "react";
import { View, Text } from "react-native";

export default function Layout(props) {
  // const tradeModalVisible = useSelector((state) => state.modal.tradeModal);
  // const dispatch = useDispatch();

  return <View>{props.children}</View>;
}
