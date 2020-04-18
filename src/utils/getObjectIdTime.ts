import { ObjectId } from "bson";
import moment from "moment";

export function getObjectIdTime(
  _id: string,
  format: string = "DD.MM.YY HH:MM:SS"
) {
  if (!ObjectId.isValid(_id)) {
    return null;
  }

  const timestamp = ObjectId.createFromHexString(_id).getTimestamp();

  return moment(timestamp).format(format);
}
