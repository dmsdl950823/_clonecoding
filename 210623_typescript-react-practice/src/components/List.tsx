import React from 'react'
import { IState as IProps }from '../App'


// const List = ({ people }: IProps) => { // same!
const List: React.FC<IProps> = ({ people }) => {
    
    // const renderList = (): JSX.Element[] => {
    const renderList = () => {
        return people.map(person => {
            return (
                <li className="List">
                <div className="List-header">
                    <h2>{person.name}</h2>
                </div>
                <p>{person.age} years old</p>
                <p className="List-note">{person.note}</p>
            </li>
            )
        })
    }
    
    return (
        <ul>
            { renderList() }
        </ul>
    )
}



export default List
