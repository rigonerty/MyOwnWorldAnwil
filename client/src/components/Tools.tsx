import React from 'react'
import { ButtonToCreate } from './UI/ButtonToCreate/ButtonToCreate'

export const Tools = () => {
  return (
    <div className='toolsList'>
        <ButtonToCreate to='/tools/createPost'>
            <i className='Post'></i>Статья
        </ButtonToCreate>
        <ButtonToCreate to='/tools/createLanguage'>
            <i className='Language'></i>Язык
        </ButtonToCreate>
        <ButtonToCreate to='/tools/createCharacter'>
          <i className='Character'></i>Персонаж
        </ButtonToCreate>
        <ButtonToCreate to='/tools/createBuilding'>Строение</ButtonToCreate>
        <ButtonToCreate to='/tools/createReligious'>Религия</ButtonToCreate>
        <ButtonToCreate to='/tools/createCountry'>Страна</ButtonToCreate>
        <ButtonToCreate to='/tools/createMaterial'>Материал</ButtonToCreate>
        <ButtonToCreate to='/tools/createRace'>Раса</ButtonToCreate>
        <ButtonToCreate to='/tools/createBeasts'>Существо</ButtonToCreate>
        <ButtonToCreate to='/tools/createOrganization'>Организация</ButtonToCreate>
    </div>
  )
}
