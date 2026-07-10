def summarize(text):

    words = text.split()

    summary = " ".join(words[:150])

    return summary