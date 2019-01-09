/* tslint:disable */

import { Query, Subscription } from "react-apollo";
import { document, documentVariables } from "./generated-types/document";
import {
  valueChanged,
  valueChangedVariables,
} from "./generated-types/valueChanged";

export {
  DOCUMENT_QUERY,
  VALUE_SUBSCRIPTION,
  UPDATE_DOCUMENT,
} from "./operations";

export class DocumentQuery extends Query<document, documentVariables> {}
export class ValueSubscription extends Subscription<
  valueChanged,
  valueChangedVariables
> {}
