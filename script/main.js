'use strict';

import { ToDo } from "./ToDo.js";
import { getStaticTaskElements, createTaskElement } from "./utils.js";

const task = new ToDo(getStaticTaskElements, createTaskElement)

task.setListener();
