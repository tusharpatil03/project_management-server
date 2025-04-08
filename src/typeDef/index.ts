import { types } from "./types";
import { queries } from "./queries";
import { mutations } from "./mutations";

import { inputs } from "./inputs";
import { scalars } from "./scalars";
import { enums } from "./enums";
import { directives } from "./directives";

export const typeDef = [types, inputs, scalars, queries, mutations, enums, directives];
