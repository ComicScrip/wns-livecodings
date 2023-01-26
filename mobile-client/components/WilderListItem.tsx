import { View, Text, StyleSheet, Image } from "react-native";
import { Wilder } from "../gql/generated/schema";
import Ionicons from "@expo/vector-icons/Ionicons";
interface WilderListItemProps {
  wilder: Wilder;
}

export default function WilderListItem({ wilder }: WilderListItemProps) {
  return (
    <View style={styles.listItem}>
      <View style={styles.avatarContainer}>
        {wilder.avatarUrl ? (
          <Image source={{ uri: wilder.avatarUrl }} />
        ) : (
          <Ionicons name={"person-circle-sharp"} size={40} />
        )}
      </View>
      <Text style={styles.listItemText}>{wilder.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
  },
  listItemText: {
    fontSize: 25,
  },
  avatarContainer: {
    marginRight: 20,
  },
});
