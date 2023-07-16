import React from 'react'
import { ButtonToCreate } from './UI/ButtonToCreate/ButtonToCreate'

export const Tools = () => {
  return (
    <div className='toolsList'>
        <ButtonToCreate to='/tools/createPost'>
            <i className='Post'></i>Article
        </ButtonToCreate>
        <ButtonToCreate to='/tools/createLanguage'>
            <i className='Language'></i>Language
        </ButtonToCreate>
        <ButtonToCreate to='/tools/createCharacter'>Character</ButtonToCreate>
        <ButtonToCreate to='/tools/createBuilding'>Building</ButtonToCreate>
        <ButtonToCreate to='/tools/createReligious'>Religious</ButtonToCreate>
        <ButtonToCreate to='/tools/createCountry'>Country</ButtonToCreate>
        <ButtonToCreate to='/tools/createMaterial'>Material</ButtonToCreate>
        <ButtonToCreate to='/tools/createRace'>Race</ButtonToCreate>
        <ButtonToCreate to='/tools/createBeasts'>Beast</ButtonToCreate>
        <ButtonToCreate to='/tools/createOrganization'>Organization</ButtonToCreate>
    </div>
  )
}
