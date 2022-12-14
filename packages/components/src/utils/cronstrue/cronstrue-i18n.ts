import { ExpressionDescriptor } from "./expressionDescriptor";
import { allLocalesLoader } from "./i18n/allLocalesLoader";

ExpressionDescriptor.initialize(new allLocalesLoader());
export default ExpressionDescriptor;

let toString = ExpressionDescriptor.toString;
let toDetails = ExpressionDescriptor.toDetails;
export { toString, toDetails };
