import { useEffect, useState } from "react";

export default function PasswordGen(){
    const [form,setForm] = useState({username:"",password:""});
    const [passwordLength , setpasswordLength] = useState(false);
    const [passwordUpper , setpasswordUpper] = useState(false);
    const [passwordNumber , setpasswordNumber] = useState(false);
    const [passwordSpecial , setpasswordSpecial] = useState(false);
    const [submit , setSubmit] = useState(false);

    useEffect(()=>{
        const password = form.password;

        if(password.length<8) setpasswordLength(true);
        else setpasswordLength(false);

        if(/[A-Z]/.test(password))  setpasswordUpper(false);
        else setpasswordUpper(true);

        if(/[0-9]/.test(password)) setpasswordNumber(false);
        else setpasswordNumber(true);

        if(/[^A-Za-z0-9]/.test(password)) setpasswordSpecial(false);
        else setpasswordSpecial(true);

        if(!passwordLength && !passwordNumber && !passwordSpecial && !passwordUpper) setSubmit(true);

    },[form.password])  

    const handleChange = (e) => {
        setForm((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };

    return (
        <div>
            <input type="text" placeholder="Fill Username: " name="username" value={form.username} onChange={handleChange} />
            <input type="text" placeholder="Fill Password: " name="password" value={form.password} onChange={handleChange} />

            {passwordLength && <div>Password length must be atleast 8 characters long</div>}
            {passwordNumber && <div>Password must contain atleast one number</div>}
            {passwordUpper && <div>Password must contain atleast one upper letter</div>}
            {passwordSpecial && <div>Password must contain atleast one special character</div>}
            {submit && <button>Submit</button>}
        </div>
    )
}