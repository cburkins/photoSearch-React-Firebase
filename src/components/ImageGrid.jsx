import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore("images");
    console.log("picture docs:", docs);

    return (
        //
        <div className="img-grid">
            {docs &&
                docs.map((doc) => {
                    let image_url = doc.signed_url;

                    return (
                        // whilehover and layout are part of framer-motion package
                        // "while-hoever" animates from current opacity to specified opacity while mouse is hovering over
                        // "layout" animates when a new image is added, sliding other images over
                        <motion.div className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc.url)} whileHover={{ opacity: 1 }} layout>
                            {/* initial, animate, and transition are part of framer-motion package */}
                            <motion.img
                                src={image_url}
                                alt="uploaded pic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            />
                        </motion.div>
                    );
                })}
        </div>
    );
};

export default ImageGrid;
