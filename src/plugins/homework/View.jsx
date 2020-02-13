import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"
import styled, { css } from "styled-components"

import Select from 'react-select';

import LessonContext from "~/Contexts/Lesson.context"
import config from "~/config"
import Input from "~/components/Input"
import Flex from "~/components/Flex"
import { serverApi } from "~/utils/api";


const View = ({state}) => {
	return (
		<div>
			{state.name.get()}
		</div>
	)
}