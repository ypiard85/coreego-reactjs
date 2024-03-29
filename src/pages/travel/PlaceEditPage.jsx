import { useParams } from "react-router"
import React, { Suspense, useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingPage from "../../components/LoadingPage"
import useSWR from "swr"
import ProductForm from "../../components/forms/ProductForm"
import PlaceForm from "../../components/forms/PlaceForm"
import axios from "axios"
import useMalware from "../../hooks/useMalware"

const PlaceEditPage = () => {

    const params = useParams()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [place, setPlace] = React.useState();

    const {canEdit} = useMalware()

    React.useEffect(()=>{
        loadPlace()
    }, [])

    const loadPlace = async () => {
        try {
            const response = await axios.get(`/places/${params.slug}`)
            canEdit(response.data.user.id)
            setPlace(response.data)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoaded(true)
        }
    }

    return isLoaded ? (
    <PlaceForm isEditMode={true} place={place} mutate={loadPlace} />
    ) : <LoadingPage type="page" />
}

export default PlaceEditPage