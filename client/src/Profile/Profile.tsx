
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate();


  const toTask = () =>
  {
    navigate("/createTask")
  }
  return (
    <div>
      <button 
      type='button'
      onClick={toTask}
      className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">To task</button>
      {/* <button >TO task<button/> */}
    </div>
  )
}

export default Profile
