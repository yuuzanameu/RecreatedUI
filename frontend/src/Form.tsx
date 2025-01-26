
import { useState, useContext} from 'react';
import styles from './css/Form.module.css';
import { v4 as uuidv4 } from 'uuid';

import CardSection from './Card'
import {GlobalProvider, GlobalContext, CardFields} from './GlobalContext'

const FormPage = () => {
    return (
        <GlobalProvider>
            <Form/>
            <CardSection/>
        </GlobalProvider>
    )
}

const Form = () => {
    const { addCard } = useContext(GlobalContext);
    const [status, setStatus] = useState('Unplaced');
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        course: '',
    });

    const courses = [
        'React Basics',
        'UI/UX design',
        'Javascript fundementals',
        'Advanced CSS',
        'Backend development'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Frontend: ...formData, status', { ...formData, status });

        try {
            // ADDING NEW CARD TO CARDS GLOBAL CONTEXT 
            const data: CardFields = {
                id: uuidv4(), 
                name: formData.name,
                role: formData.role,
                email: formData.email,
                phone: formData.phone,
                course: formData.course,
                status: status
            }

            addCard(data)

            // HANDLING PLACED AND UNPLACED AND TOTAL COUNTERS 
            const responseFromCounter = await fetch('http://project.editnow.site/api/submit/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    placed: status === 'Placed' ? 1 : 0,
                    unplaced: status === 'Unplaced' ? 1 : 0,
                }),
            });

            if (!responseFromCounter.ok) {
                throw new Error('Network responseFromCounter was not ok');
            }

            const result = await responseFromCounter.json();
            console.log('Frontend: responseFromCounter', result);

            // POSTING NEW CARD ID TO DB 
            const responseFromCardDb = await fetch('http://project.editnow.site/api/add/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            })

            if (!responseFromCardDb.ok) {
                throw new Error('Network responseFromCardDb was not ok');
            }

            const resultFromCardDb = await responseFromCardDb.json();
            console.log('Frontend: responseFromCardDb', resultFromCardDb);

        } 
        catch (error) {
            console.error('Frontend: Error: handleSubmit', error);
        }

        setFormData({
            name: '',
            role: '',
            email: '',
            phone: '',
            course: '',
        });
        setStatus('Unplaced');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Fill This Form</h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className={styles.input}
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Role:</label>
                        <input
                            type="text"
                            name="role"
                            placeholder="Enter your role"
                            className={styles.input}
                            onChange={handleChange}
                            value={formData.role}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            className={styles.input}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Phone Number:</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            className={styles.input}
                            onChange={handleChange}
                            value={formData.phone}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Course:</label>
                        <select
                            name="course"
                            className={styles.select}
                            onChange={handleChange}
                            value={formData.course}
                        >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Status:</label>
                        <select
                            className={styles.select}
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        >
                            <option value="Unplaced">Unplaced</option>
                            <option value="Placed">Placed</option>
                        </select>
                    </div>
                </div>
                <div className={styles.submitContainer}>
                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </div>

            </form>

        </div>
    );
};


export default FormPage;

